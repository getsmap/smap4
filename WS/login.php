<?php 

 	  // Database connection settings
 	  define("PG_DB"  , "sandbox");
 	  define("PG_HOST", "localhost");
 	  define("PG_USER", "postgres");
	  define("PG_PASS", "Categoryit73CL");
 	  define("PG_PORT", "5432");
 	  define("TABLE",   "cleber_test");
	  
	  $con = pg_connect("dbname=".PG_DB." host=".PG_HOST." password=".PG_PASS." user=".PG_USER);
	  
	  if (!$con){
		
		die('Could not connect: ');
	  
	  }
	  
	  //************************************************************************************************
	    
	  echo "Connection Established";
	  
	  $categorry = $_REQUEST['category'];
	  
	  $name = $_REQUEST['username'];
	  
	  //echo " ET9901268223 ---> : ";
		  
	  $pass = $_REQUEST['password'];
	  
	  //echo " QMQY3 ---> : ";

	  
	  $loginR = checkUserPass($name, $pass);
	  
	  echo $loginR;
	  
	  //************************************************************************************************
	  
	  //************************************************************************************************
	  
	  function checkUserPass($username, $password){
         //global $connection;
         $connection = pg_connect("dbname=".PG_DB." host=".PG_HOST." password=".PG_PASS." user=".PG_USER);
      
         //$username = str_replace("'","''",$username)
         $password = md5($password);

         // Verify that user is in database
         $q = "SELECT encryptedpass FROM ".TABLE." WHERE username = '$username'";
         $result = pg_query($connection, $q);
                           
         if(!$result || (pg_num_rows($result) < 1)){
            return 5; //Indicates username failure
         }      
    
	      // Retrieve password from result
	      $dbarray = pg_fetch_array($result);
 	        
	      // Validate that password is correct
	      if($password == $dbarray['encryptedpass']){
	         
	         return 0; //Success! Username and password confirmed
	         
	      }
	      else{
	         
	         return 1; //Indicates password failure
	         
	      }
	      pg_close($connection);
       }

	  //************************************************************************************************ 
	  
	  pg_close($con);
	
?>	
		