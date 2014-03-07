<?php
date_default_timezone_set( 'UTC' );

define('SQLITE_FILE', 'locations.sqlite3');


function createTable() {
    global $dbh;
    $dbh->exec("CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    added TEXT NOT NULL,
    modified TEXT DEFAULT NULL)");
}


function createLocation( $name, $latitude, $longitude ) {
    global $dbh;

    $stmt = $dbh->prepare("INSERT INTO locations VALUES(null, :name, :latitude, :longitude, :added, null)");
    $stmt->bindParam( ':name', $name );
    $stmt->bindParam( ':latitude', $latitude );
    $stmt->bindParam( ':longitude', $longitude );
    $stmt->bindParam( ':added', date('Y-m-d g:i:s', time()) );
    return $stmt->execute();
}

function readLocation( $id=null ) {
    global $dbh;

    if( $id ) {
        $stmt = $dbh->prepare("SELECT * FROM locations WHERE id=:id LIMIT 1");
        $stmt->bindParam( ':id', $id );
    }
    else {
        $stmt = $dbh->prepare("SELECT * FROM locations ORDER BY added DESC");
    }
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function updateLocation( $name, $latitude, $longitude, $id ) {
    global $dbh;

    $stmt = $dbh->prepare("UPDATE locations SET name=:name, latitude=:latitude, longitude=:longitude, modified=:modified WHERE id=:id");
    $stmt->bindParam( ':name', $name );
    $stmt->bindParam( ':latitude', $latitude );
    $stmt->bindParam( ':longitude', $longitude );
    $stmt->bindParam( ':modified', date('Y-m-d g:i:s', time()) );
    $stmt->bindParam( ':id', $id );
    return $stmt->execute();
}

function deleteLocation( $id ) {
    global $dbh;

    $stmt = $dbh->prepare("DELETE FROM locations WHERE id=:id");
    $stmt->bindParam( ':id', $id );
    return $stmt->execute();
}


try {
    $create_table = false;
    if ( !file_exists(  getcwd() . '/' . SQLITE_FILE ) ) {
        $create_table = true;
    }

    $dbh = new PDO('sqlite:' . SQLITE_FILE);

    if( $create_table ) {
        createTable();
    }
}
catch(PDOException $e) {
    print 'Exception : '.$e->getMessage();
}