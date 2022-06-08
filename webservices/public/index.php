<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
$db = new mysqli("localhost", "root", "", "mascotas", 3306);

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello World!");
    return $response;
});

$app->get('/mensage-es', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hola mundo API! :D");
    return $response;
});

$app->get('/hello/{nombre}/{edad}', function ($request, $response, $args) {
    $mensaje = "Hola {$args['nombre']} tu tienes {$args['edad']} anios";
    $payload = json_encode($mensaje);
    $response->getBody()->write($payload);

    return $response;
});

$app->post('/suma', function (Request $request, Response $response, $args) {

    $Datos = $request->getParsedBody();
    $resultado = $Datos['n1'] + $Datos['n2'];
    $respuesta = array("metodo" => "Suma", "Resultado" => $resultado);
    $response->getBody()->write("Hola mundo API! :D" . $resultado);

    $payload = json_encode($respuesta);
    $response->getBody()->write($payload);
    return $response
        ->withHeader('Content-Type', 'application/json;charset=utf-8')
        ->withStatus(200);
});
$app->get('/mascotas', function (Request $request, Response $response, $args) use ($db) {
    $query = $db->query("select * from mascotas");
    $mascotas = array();
    while ($fila = $query->fetch_assoc()) {

        $mascotas[] = $fila;
    }

    $payload = json_encode($mascotas);
    $response->getBody()->write($payload);

    return  $response
        ->withHeader('Content-Type', 'application/json;charset=utf-8')
        ->withStatus(200);
});

$app->post('/mascotas', function (Request $request, Response $response, $args) use ($db) {
    $Datos = $request->getParsedBody();
    $sql = "insert into mascotas(nombre,edad,raza)values('{$Datos['nombre']}',{$Datos['edad']},'{$Datos['raza']}')";
    $query = $db->query($sql);
    if ($query)
        $res = array("status" => "true", "message" => "Registro insertado correctamente");
    else
        $res = array("status" => "true", "message" => "El registro no se pudo insertar");

    $payload = json_encode($res);

    $response->getBody()->write($payload);

    return  $response
        ->withHeader('Content-Type', 'application/json;charset=utf-8')
        ->withStatus(200);
});
$app->delete('/mascotas/{id}', function (Request $request, Response $response, $args) use ($db) {
    $sql = ("delete from mascotas where id = '{$args['id']}'");
    $query = $db->query($sql);

    if ($query) {
        $res = array("status" => "true", "message" => "Registro eliminado con éxito");
    } else {
        $res = array("status" => "true", "message" => "Registro no se elimino con éxito");
    }


    $payload = json_encode($res);
    $response->getBody()->write($payload);


    return $response->withHeader('Content-Type', 'application/json;charset=utf-8')->withstatus(200);
});
$app->get('/mascotas/{id}', function (Request $request, Response $response, $args) use ($db) {
    $query = $db->query("select * from mascotas where id = {$args['id']}");
    $mascotas = array();
    while ($fila = $query->fetch_assoc()) {

        $mascotas[] = $fila;
    }

    $payload = json_encode($mascotas);
    $response->getBody()->write($payload);

    return  $response
        ->withHeader('Content-Type', 'application/json;charset=utf-8')
        ->withStatus(200);
});

$app->post('/mascotas/{id}', function (Request $request, Response $response, $args) use ($db) {
    $Datos = $request->getParsedBody();
    $sql = "update mascotas set nombre = '{$Datos['nombre']}', edad = {$Datos['edad']}, raza = '{$Datos['raza']}' where id = {$args['id']}";
    $query = $db->query($sql);

    if ($query)
        $res = array("status" => "true", "message" => "Registro modificado correctamente");
    else
        $res = array("status" => "false", "message" => "El registro no se pudo modificar");

    $payload = json_encode($res);

    $response->getBody()->write($payload);

    return  $response
        ->withHeader('Content-Type', 'application/json;charset=utf-8')
        ->withStatus(200);
});

$app->run();
