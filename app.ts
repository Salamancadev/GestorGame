// app.ts
import * as readline from "readline";
import { MissionManager, Mission } from "./misiones";

const manager = new MissionManager();

const mission: Mission = {
  id: "m1",
  title: "Recolectar manzanas",
  description: "Consigue 3 manzanas para el aldeano.",
  state: "active",
  objectives: [
    { id: "o1", description: "Recolecta 1 manzana", completed: false },
    { id: "o2", description: "Recolecta 2 manzanas", completed: false },
    { id: "o3", description: "Recolecta 3 manzanas", completed: false },
  ],
};

manager.addMission(mission);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n=== Sistema de Misiones ===");
  manager.listMissions().forEach((m: Mission) => {
    console.log(`\n📜 ${m.title} [${m.state}]`);
    console.log(m.description);
    m.objectives.forEach((o) =>
      console.log(`   - [${o.completed ? "x" : " "}] ${o.description} (${o.id})`)
    );
  });

  console.log("\nOpciones:");
  console.log("1. Completar objetivo");
  console.log("2. Salir");

  rl.question("Elige una opción: ", (option: string) => {
    if (option === "1") {
      rl.question("👉 Ingresa el ID del objetivo (ej: o1): ", (objId: string) => {
        manager.completeObjective("m1", objId.trim());
        showMenu();
      });
    } else if (option === "2") {
      console.log("👋 Saliendo...");
      rl.close();
    } else {
      console.log("⚠️ Opción inválida");
      showMenu();
    }
  });
}

showMenu();
