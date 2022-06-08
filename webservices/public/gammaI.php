<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$db = new mysqli("localhost", "root", "", "mascotas",33066);

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});
$app->get('/mensaje-es', function (Request $request, Response $response, $args) {
    $response->getBody()->write("¡Hola mundo API!");
    return $response;
});

$app->get('/hello/{nombre}/{edad}', function ($request, $response, $args) {
    $mensaje="Hola {$args['nombre']} tú tienes {$args['edad']} años";
    $payload=json_encode($mensaje);
    $response->getBody()->write( $payload);
    
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});

$app->post('/suma', function (Request $request, Response $response, $args) {
    $Datos = $request->getParsedBody();
    $res=$Datos['n1']+$Datos['n2'];
    $respuesta=array("metodo"=>"Suma","Resultado"=>"$res");
 
    $payload=json_encode($respuesta);
    $response->getBody()->write( $payload);
    
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});

$app->get('/Mascotas', function (Request $request, Response $response, $args) use ($db){
    $query=$db->query("select * from mascotas");
    $mascotas=array();
    while($fila= $query->fetch_assoc())
    {
        
        $mascotas[]=$fila;
    }

    $payload=json_encode($mascotas);
    $response->getBody()->write( $payload);
    
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});

$app->post('/Mascotas', function (Request $request, Response $response, $args) use ($db){
    $Datos = $request->getParsedBody();
    $sql="insert into mascotas(nombre,edad,raza)values('{$Datos['nombre']}',{$Datos['edad']},'{$Datos['raza']}')";
    $query=$db->query($sql);
    if($query)
        $res=array("status"=>"true","message"=>"Registro insertado correctamente");
    else
        $res=array("status"=>"true","message"=>"El registro no se pudo insertar");

    $payload=json_encode($res);
    $response->getBody()->write( $payload);
    
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});

$app->get('/Mascotas/{id}', function (Request $request, Response $response, $args) use ($db){
   
     $sql="delete from mascotas where id={$args['id']}";
     $query=$db->query($sql);
    if($query)
        $res=array("status"=>"true","message"=>"Registro eliminado correctamente");
    else
        $res=array("status"=>"true","message"=>"El registro no se pudo eliminar");

    $payload=json_encode($res);
    $response->getBody()->write( $payload);
 
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});
$app->get('/Mascotas/buscar/{id}', function (Request $request, Response $response, $args) use ($db){
    $query= $db->query("select * from mascotas where id = {$args['id']}");
    $mascotas=array();
    while($fila= $query->fetch_assoc())
    {
        
        $mascotas[]=$fila;
    }

    $payload=json_encode($mascotas);
    $response->getBody()->write( $payload);
    
    return  $response
    ->withHeader('Content-Type','application/json;charset=utf-8')
    ->withStatus(200);
});

$app->run();