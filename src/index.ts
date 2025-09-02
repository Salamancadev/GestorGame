import inquirer from "inquirer";
import fs from "fs";
import path from "path";

// Abstracción: interfaz
interface IMision {
  readonly id: number;
  titulo: string;
  completada: boolean;
  completar(): void;
}

// Abstracción: clase abstracta
abstract class MisionBase implements IMision {
  readonly id: number;
  protected _titulo: string;
  protected _completada: boolean;

  constructor(id: number, titulo: string) {
    this.id = id;
    this._titulo = titulo;
    this._completada = false;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(valor: string) {
    this._titulo = valor;
  }

  get completada(): boolean {
    return this._completada;
  }

  completar(): void {
    this._completada = true;
  }

  // Método público para restaurar el estado
  restaurarEstado(completada: boolean): void {
    this._completada = completada;
  }
}

// Herencia y polimorfismo
class Mision extends MisionBase {
  constructor(id: number, titulo: string) {
    super(id, titulo);
  }

  // Polimorfismo: sobrescribimos el método
  completar(): void {
    super.completar();
    console.log(`🎉 Misión "${this.titulo}" completada.`);
  }
}

// Composición: Gestor contiene misiones
class GestorMisiones {
  private misiones: Mision[] = [];
  private readonly DATA_FILE = path.join(__dirname, "misiones.json");

  constructor() {
    this.cargarMisiones();
  }

  private cargarMisiones() {
    if (fs.existsSync(this.DATA_FILE)) {
      const data = fs.readFileSync(this.DATA_FILE, "utf-8");
      const misionesJson = JSON.parse(data);
      this.misiones = misionesJson.map(
        (m: any) => {
          const mision = new Mision(m.id, m.titulo);
          mision.restaurarEstado(m.completada); // Usar el método público
          return mision;
        }
      );
    }
  }

  private guardarMisiones() {
    fs.writeFileSync(
      this.DATA_FILE,
      JSON.stringify(this.misiones.map(m => ({
        id: m.id,
        titulo: m.titulo,
        completada: m.completada
      })), null, 2),
      "utf-8"
    );
  }

  listarMisiones(): Mision[] {
    return this.misiones;
  }

  agregarMision(titulo: string) {
    const nueva = new Mision(Date.now(), titulo);
    this.misiones.push(nueva);
    this.guardarMisiones();
  }

  completarMision(id: number) {
    const mision = this.misiones.find(m => m.id === id);
    if (mision && !mision.completada) {
      mision.completar();
      this.guardarMisiones();
    }
  }
}

// Programa principal
async function mostrarMenu(gestor: GestorMisiones) {
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
      const misiones = gestor.listarMisiones();
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
      gestor.agregarMision(titulo);
      console.log("\n✅ Misión agregada con éxito.\n");
      break;

    case "Marcar misión como completada":
      const misiones2 = gestor.listarMisiones();
      if (misiones2.length === 0) {
        console.log("\n⚠️ No hay misiones para completar.\n");
      } else {
        const { id } = await inquirer.prompt([
          {
            type: "list",
            name: "id",
            message: "Selecciona una misión:",
            choices: misiones2.map((m) => ({
              name: `${m.completada ? "✅" : "❌"} ${m.titulo}`,
              value: m.id,
            })),
          },
        ]);
        gestor.completarMision(id);
      }
      break;

    case "Salir":
      console.log("\n👋 ¡Hasta luego!\n");
      return;
  }

  await mostrarMenu(gestor);
}

// Iniciar el programa
const gestor = new GestorMisiones();
mostrarMenu(gestor);