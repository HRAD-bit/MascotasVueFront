// let mascotas=[
//     {
//         id:1,
//         nombre:'Rambo',
//         edad:4,
//         raza:'Canino'
//     },
//     {
//         id:2,
//         nombre:'Firulais',
//         edad:1,
//         raza:'Canino'
//     }

// ]
let mascotas = [];
let mascota = {
  id: 0,
  nombre: "",
  edad: 0,
  raza: "",
};
function llenaDatos() {
  fetch('http://localhost:8888/Mascotas')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      mascotas = data;

      if (mascotas.lenght == 0) {
        mascotas = [];
        console.log("No hay registros.");
        document.getElementById("msgalert").style.display = "block";
      } else {
        document.getElementById("msgalert").style.display = "none";
      }

      datosTabla.innerHTML = "";
      for (let index = 0; index < mascotas.length; index++) {
        datosTabla.innerHTML += `
       <tr>
        <td>${mascotas[index].id}</td>
        <td>${mascotas[index].nombre}</td>
        <td>${mascotas[index].edad}</td>
        <td>${mascotas[index].raza}</td>
        <td><button class="btnEliminar" onclick="eliminar(${mascotas[index].id})"><i class="far fa-trash-alt"></i></button></td>
        <td><button class="btnModificar" onclick="editar(${index})"><i class="far fa-edit"></i></button></td>
      </tr> 
        `;
      }
    });

  // if(localStorage.getItem('arrayMascotas')===null)
  // {
  //     mascotas=[]
  //     console.log('no tiene nada');

  //     document.getElementById('msgalert').style.display="block"

  // }
  // else{
  //     document.getElementById('msgalert').style.display="none"
  //     mascotas= JSON.parse(localStorage.getItem('arrayMascotas'))
  // }
}
document.getElementById("modificar").style.display = "none";
document.getElementById("cancelar").style.display = "none";
document.getElementById("errorNombre").style.display = "none";

llenaDatos(mascotas);

limpiarErrores();

registrar.addEventListener("click", () => {
  if (validar() === true)
    //si estrue quere decir que hay un error
    return; //y su hay un error no debe continuar con el código así que se sale

  //  mascotas.push(llenaMascotaNew());

  //  mascotas.push({
  //     'id': parseInt(document.getElementById('id').value),
  //     'nombre':  nombre.value,
  //     'edad':parseInt(edad.value),
  //     'raza':raza.value
  //  })

  limpiaMascota();

  llenaMascota();

  //   mascotas.push({
  //     id: mascota.id,
  //     nombre: mascota.nombre,
  //     edad: mascota.edad,
  //     raza: mascota.raza,
  //   });
  var formData = new FormData();

  formData.append("nombre", mascotas.nombre);
  formData.append("edad", mascotas.edad);
  formData.append("raza", mascotas.raza);

  fetch('http://localhost:8888/Mascotas', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
  //   localStorage.setItem("arrayMascotas", JSON.stringify(mascotas));
  llenaDatos();
  limpiaFrm();
});
function limpiarErrores() {
  //   document.getElementById("errorIdRequerido").style.display = "none";
  //   document.getElementById("errorIdNumerico").style.display = "none";
  document.getElementById("errorNombre").style.display = "none";
  document.getElementById("errorNombreRequerido").style.display = "none";
  document.getElementById("errorEdadRequerido").style.display = "none";
  document.getElementById("errorEdadNumerico").style.display = "none";
  document.getElementById("errorRazaRequerido").style.display = "none";
}
function validar() {
  let error = false;
  // console.log("validando");
  //   error = Requerido(id.value, "errorIdRequerido");
  //   error = validarNumeros(id.value, "errorIdNumerico");
  error = Requerido(nombre.value, "errorNombreRequerido");
  error = Requerido(edad.value, "errorEdadRequerido");
  error = validarNumeros(edad.value, "errorEdadNumerico");
  error = Requerido(raza.value, "errorRazaRequerido");

  return error;
}
function Requerido(valor, control) {
  if (valor == "") {
    document.getElementById(control).style.display = "block";
    return true;
  } else {
    document.getElementById(control).style.display = "none";
    return false;
  }
}
function validarNumeros(valor, control) {
  if (/^([0-9])*$/i.test(valor)) {
    //  alert("La dirección de email " + valor + " es correcta!.");
    document.getElementById(control).style.display = "none";
    return true;
  } else {
    document.getElementById(control).style.display = "block";
    return false;
  }
}
// function validarEmail(valor) {
//     if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
//     //  alert("La dirección de email " + valor + " es correcta!.");
//      document.getElementById('errorNombre').style.display="none"
//      return false
//     } else {
//         document.getElementById('errorNombre').style.display="block"
//         return true
//     }
//   }

function eliminar(i) {
  let resp = confirm("¿Está seguro de eliminar el registro?");
  if (resp) {
    console.log('http://localhost:8888/Mascotas/' + i);
    fetch('http://localhost:8888/Mascotas/' + i)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("Success", response);

        if (mascotas.lenght == 0) {
          alet(response.message);
        } else {
          // document.getElementById("msgalert").style.display = "none";
        }
      });
  }
}

function limpiaFrm() {
  //   id.value = "";
  nombre.value = "";
  edad.value = "";
  raza.value = "";
}
function llenaMascotaNew() {
  var mascota = new Object();
  //   mascota.id = parseInt(document.getElementById("id").value);
  mascota.nombre = nombre.value;
  mascota.edad = parseInt(edad.value);
  mascota.raza = raza.value;
  return mascota;
}
function llenaMascota() {
  //   mascota.id = parseInt(id.value);
  mascota.nombre = nombre.value;
  mascota.edad = parseInt(edad.value);
  mascota.raza = raza.value;
}
function limpiaMascota() {
  //   mascota.id = "";
  mascota.nombre = "";
  mascota.edad = "";
  mascota.raza = "";
}

function editar(i) {
  console.log("indice", i);
  index.value = i;
  //   id.value = mascotas[i].id;
  nombre.value = mascotas[i].nombre;
  edad.value = mascotas[i].edad;
  raza.value = mascotas[i].raza;
  llenaMascota();
  document.getElementById("registrar").style.display = "none";
  document.getElementById("modificar").style.display = "block";
  document.getElementById("cancelar").style.display = "block";
}

cancelar.addEventListener("click", () => {
  document.getElementById("registrar").style.display = "block";
  document.getElementById("modificar").style.display = "none";
  document.getElementById("cancelar").style.display = "none";
  limpiaMascota();
  limpiaFrm();
});

modificar.addEventListener("click", function () {
  limpiaMascota();
  llenaMascota();
  //   mascotas[index.value].id = mascota.id;
//   mascotas[index.value].nombre = mascota.nombre;
//   mascotas[index.value].edad = mascota.edad;
//   mascotas[index.value].raza = mascota.raza;
  llenaDatos();
});
