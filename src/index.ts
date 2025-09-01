import inquirer from "inquirer";
import fs from "fs";
import path from "path";

// Ruta del archivo donde se guardan las misiones
const DATA_FILE = path.join(__dirname, "misiones.json");

interface Mision {
  id: number;
  titulo: string;
  completada: boolean;
}

// Cargar misiones desde JSON
function cargarMisiones(): Mision[] {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  }
  return [];
}

// Guardar misiones en JSON
function guardarMisiones(misiones: Mision[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(misiones, null, 2), "utf-8");
}

// Mostrar menú
async function mostrarMenu() {
  const misiones = cargarMisiones();

  const { opcion } = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "📌 ¿Qué deseas hacer?",
      choices: [
        "Ver misiones",
        "Agregar misión",
        "Marcar misión como completada",
        "Salir",
      ],
    },
  ]);

  switch (opcion) {
    case "Ver misiones":
      if (misiones.length === 0) {
        console.log("\n⚠️ No tienes misiones aún.\n");
      } else {
        console.log("\n📋 Lista de misiones:");
        misiones.forEach((m) =>
          console.log(
            `  [${m.completada ? "✅" : "❌"}] ${m.id}. ${m.titulo}`
          )
        );
        console.log();
      }
      break;

    case "Agregar misión":
      const { titulo } = await inquirer.prompt([
        {
          type: "input",
          name: "titulo",
          message: "Escribe el título de la misión:",
        },
      ]);

      const nuevaMision: Mision = {
        id: Date.now(),     // ID único
        titulo: titulo,     // Título ingresado
        completada: false,  // Siempre inicia en pendiente
      };

      misiones.push(nuevaMision);
      guardarMisiones(misiones);

      console.log("\n✅ Misión agregada con éxito.\n");
      break;

    case "Marcar misión como completada":
      if (misiones.length === 0) {
        console.log("\n⚠️ No hay misiones para completar.\n");
      } else {
        const { id } = await inquirer.prompt([
          {
            type: "list",
            name: "id",
            message: "Selecciona una misión:",
            choices: misiones.map((m) => ({
              name: `${m.completada ? "✅" : "❌"} ${m.titulo}`,
              value: m.id,
            })),
          },
        ]);

        const mision = misiones.find((m) => m.id === id);
        if (mision) {
          mision.completada = true;
          guardarMisiones(misiones);
          console.log("\n🎉 Misión completada con éxito.\n");
        }
      }
      break;

    case "Salir":
      console.log("\n👋 ¡Hasta luego!\n");
      return; // Finaliza el programa
  }

  // Volver a mostrar el menú
  await mostrarMenu();
}

// Iniciar el programa
mostrarMenu();
