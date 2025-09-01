import * as fs from "fs";

export interface Mission {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export class MissionManager {
  private missions: Mission[] = [];
  private filePath = "missions.json";

  constructor() {
    this.loadMissions();
  }

  private loadMissions() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.missions = JSON.parse(data);
    }
  }

  private saveMissions() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.missions, null, 2));
  }

  addMission(title: string, description: string) {
    const newMission: Mission = {
      id: this.missions.length > 0 ? this.missions[this.missions.length - 1].id + 1 : 1,
      title,
      description,
      completed: false,
    };
    this.missions.push(newMission);
    this.saveMissions();
    console.log(`Misión agregada: ${title}`);
  }

  completeMission(id: number) {
    const mission = this.missions.find(m => m.id === id);
    if (mission) {
      mission.completed = true;
      this.saveMissions();
      console.log(`Misión completada: ${mission.title}`);
    } else {
      console.log("Misión no encontrada.");
    }
  }

  listMissions() {
    console.log("\n📋 Lista de Misiones:");
    this.missions.forEach(m => {
      console.log(`[${m.completed ? "✔" : " "}] ${m.id}. ${m.title} - ${m.description}`);
    });
  }
}
