<%@ WebHandler Language="C#" Class="autocomplete_skane_limit.autocomplete_skane_limit" %>

using System;
using System.Data;
using System.Web;
using System.Collections;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Text;
using System.Configuration;
using Npgsql;


namespace autocomplete_skane_limit
{

    public class autocomplete_skane_limit : IHttpHandler
    {
 
        
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.QueryString["q"] != null)
            {
                // q = the searchstring
                string q = context.Request.QueryString["q"].ToUpper();
                string strsql = "select objektnamn from poi_hbg_sok where";
                if (context.Request.QueryString["limit"] != null)
                {
                    //limit = max 
                    string limit = context.Request.QueryString["limit"];
		    strsql = strsql + " objektnamn like '" + q + "%'";
                    strsql = strsql + " order by raknare_sorterad limit "+limit;
                }
                else
                {
                    strsql = strsql + " objektnamn like '" + q + "%'";
                    strsql = strsql + " order by raknare_sorterad";
                }
	    //Add your own connectionstring! And configure the sql.
	    NpgsqlConnection conn = new NpgsqlConnection("Host=;Port=;User Id=;Password=;Database=;");
            conn.Open();

            NpgsqlCommand command = new NpgsqlCommand(strsql, conn);
            NpgsqlDataReader dr = command.ExecuteReader();
            
            String list = "";
            while (dr.Read())
            {
                String name = dr.GetString(0).ToUpper();
                list = list + name + "\n";
            }
                     

            context.Response.Write(list);
	    dr.Close();
	    conn.Close();
	    return;
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
