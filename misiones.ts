// mission.ts
export type MissionState = "pending" | "active" | "completed";

export interface Objective {
  id: string;
  description: string;
  completed: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  state: MissionState;
  objectives: Objective[];
}

export class MissionManager {
  private missions: Mission[] = [];

  addMission(mission: Mission) {
    this.missions.push(mission);
  }

  listMissions() {
    return this.missions;
  }

  completeObjective(missionId: string, objectiveId: string) {
    const mission = this.missions.find((m) => m.id === missionId);
    if (!mission) return;

    const obj = mission.objectives.find((o) => o.id === objectiveId);
    if (obj && !obj.completed) {
      obj.completed = true;
      console.log(`✅ Objetivo completado: ${obj.description}`);
    }

    if (mission.objectives.every((o) => o.completed)) {
      mission.state = "completed";
      console.log(`🎉 ¡Misión completada!: ${mission.title}`);
    }
  }
}
