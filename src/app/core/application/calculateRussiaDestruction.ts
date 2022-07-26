import calculateDamageResources from "./calculateDamageResources";
import { Attack } from "../domain/model/Attack";
import { RussiaDestruction } from "../domain/model/RussiaDestruction";

export function calculateRussiaDestruction(attack: Attack, destruction: RussiaDestruction): RussiaDestruction {

  const newtarget = attack.russianTarget.name
  const newTargets = [ ...destruction.targets, newtarget]
  const damage = calculateDamageResources(destruction.damage, attack.weapon.damage)

  return {
    targets: [...new Set(newTargets)],
    damage
  }
}