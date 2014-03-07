<?php
require_once('sqlite_db.php');


$id         = (int) (isset( $_GET['id']) ? trim(strip_tags($_GET['id'])) : '' ) ;
$is_POST    = $_SERVER['REQUEST_METHOD']  === 'POST';
$is_PUT     = $_SERVER['REQUEST_METHOD']  === 'PUT';
$is_DELETE  = $_SERVER['REQUEST_METHOD']  === 'DELETE';
$is_GET     = !$is_POST && !$is_PUT && !$is_DELETE;


//***************************************************************************
// Create
//***************************************************************************
if ( $is_POST ) {
    $json = file_get_contents("php://input");

    $data = json_decode( $json );
    if( $data ) {
        createLocation( $data->item->name, $data->item->latitude, $data->item->longitude );
    }
    exit();
}
else
//***************************************************************************
// Read
//***************************************************************************
if ( $is_GET  ) {
    if( $id ) {
        echo json_encode( readLocation( $id ) );
    }
    else {
        echo json_encode( array( 'items' => readLocation() ) );
    }
    exit();
}
else
//***************************************************************************
// Update
//***************************************************************************
if ( $is_PUT && $id ) {
    $json = file_get_contents("php://input");

    $data = json_decode( $json );
    if( $data ) {
        updateLocation( $data->item->name, $data->item->latitude, $data->item->longitude, $id );
    }
    exit();
}
else
//***************************************************************************
// Delete
//***************************************************************************
if ( $is_DELETE && $id ) {
    deleteLocation( $id );
    exit();
}