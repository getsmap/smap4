<%@ WebHandler Language="C#" Class="sokexakt_skane_limit.sokexakt_skane_limit" %>

using System;
using System.Data;
using System.Web;
using System.Collections;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Text;
//För att kunna importera Json så måste det finnas en dll (Newtonsoft.Json.dll) i bin-katalogen
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Configuration;
using Npgsql;
using NpgsqlTypes;


namespace sokexakt_skane_limit
{
    public class sokexakt_skane_limit : IHttpHandler
    {

        // process database rows into GeoJSON features
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.QueryString["q"] != null)
            {
                // params
                // q = the searchstring
                string q = context.Request.QueryString["q"].ToUpper().Trim();

		//Add your own connectionstring! And configure the sql.
		NpgsqlConnection conn = new NpgsqlConnection("Host=;Port=;User Id=;Password=;Database=;");
            	conn.Open();

                string strsql = "select easting, northing, objektnamn, objekttyp from poi_hbg_sok where";
                strsql = strsql + " objektnamn = '" + q + "'";


		NpgsqlCommand command = new NpgsqlCommand(strsql, conn);
            	NpgsqlDataReader dr = command.ExecuteReader();

                JArray features = new JArray();
                while (dr.Read())
                {
                    JArray coordinates = new JArray();
                    //coordinates = Convert.ToInt32(dr.);
		    coordinates.Add(dr.GetValue(0));
                    coordinates.Add(dr.GetValue(1));

                    JObject geometry = new JObject();
                    geometry.Add(new JProperty("type", "Point"));
                    geometry.Add(new JProperty("coordinates", coordinates));

                    JObject properties = new JObject();
                    // these are the attributes used clientside to view popups
                    String name = dr.GetString(2).ToUpper();
                    String category = dr.GetString(3);
                    //String url = "http://localhost/test.html";

                    properties.Add(new JProperty("name", name));
                    properties.Add(new JProperty("category", category));
                    //properties.Add(new JProperty("url", url));

                    JObject feature = new JObject();
                    feature.Add(new JProperty("type", "Feature"));
                    feature.Add(new JProperty("geometry", geometry));
                    feature.Add(new JProperty("properties", properties));
                    features.Add(feature);
                }

                JObject geoJson = new JObject();
                geoJson.Add(new JProperty("type", "FeatureCollection"));
                geoJson.Add(new JProperty("features", features));
                conn.Close();
                dr.Close();

                context.Response.ContentEncoding = Encoding.UTF8;
                context.Response.ContentType = "application/json; charset=utf-8;";
                context.Response.Write(geoJson);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}

