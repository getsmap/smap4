<?php 

 	  // Database connection settings
 	  define("PG_DB"  , "crawls");
 	  define("PG_HOST", "localhost");
 	  define("PG_USER", "postgres");
	  define("PG_PASS", "123456");
 	  define("PG_PORT", "5432");
 	  define("TABLE",   "schpoints");
	  
	  $con = pg_connect("dbname=".PG_DB." host=".PG_HOST." password=".PG_PASS." user=".PG_USER);
	  
	  if (!$con){
		
		die('Could not connect: ');
	  
	  }
	  
	  //************************************************************************************************
	    
	  //echo "Connection Established";
	  
	  $description = $_REQUEST['ptDesc'];
	  
	  $toReturn = insertDescription($description);
	  
	  //echo "---> ";
	  //echo $name;
	  
	  //************************************************************************************************
	  
	  //************************************************************************************************
	  
	  function insertDescription($description){
	  
		  $connection = pg_connect("dbname=".PG_DB." host=".PG_HOST." password=".PG_PASS." user=".PG_USER);
		  
		  $sqlinsert = "INSERT INTO ".TABLE." (gid, description) VALUES (DEFAULT, 'JUST TEMP DESCRIPTION')";
		  
		  $queryinsert = pg_query($connection, $sqlinsert);	  
		  
		  $oid = pg_last_oid($queryinsert);
		  
		  //echo "---pg_last_oid--> ";
		  	   
		  //echo $oid;
		  
		  $last_oid = $oid-1;
		  
		  //echo "---last_oid--> ";
		  
		  //echo $last_oid;
		  
		  //************************************************************************************************
		  
		  
		  //************************************************************************************************
		  
		  $sqlupdate = "UPDATE ".TABLE." SET description = '$description' WHERE oid = $last_oid";  
	      
	      $queryupdate = pg_query($connection, $sqlupdate);
	      
	      $sqldelete = "DELETE FROM ".TABLE." WHERE oid = $oid";
		  
		  $querydelete = pg_query($connection, $sqldelete);
		  
		  




		  $q = "SELECT description FROM ".TABLE." WHERE oid = '$last_oid'";
         
          $result = pg_query($connection, $q);
          //$fres = pg_fetch_result ($result);
                           
          if(!$result || (pg_num_rows($result) < 1)){
            return 5; //Indicates description failure
          }      
           
	         return 0; //Success! Username and password confirmed
	  
		  pg_close($connection);
	  
	  }
	  
	  //************************************************************************************************
	  
	  
	  //************************************************************************************************
	  
	  //$sqllast_oid = "SELECT oid FROM ".TABLE." ORDER BY oid DESC LIMIT 1;";
	  
	  //$querylast_oid = pg_query($con, $sqllast_oid);
	  
	  //$myarray = pg_fetch_all($querylast_oid);
	  
	  //$last_oid = $myarray[0]; // 
	  
	  
	  //$myBigArray = pg_fetch_array($myarray, 0, PGSQL_NUM);
	  
	  //echo "---array--> ";
	  	   
	  //echo $last_oid;
	  
	  //echo "---Bigarray--> ";
	  
	  //echo $myBigArray;
	  
	  
	  //************************************************************************************************
  
	  pg_close($con);
	
?>	
		