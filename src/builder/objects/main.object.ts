import { addToSet } from "../../helpers/set.helper.js";
import type { DataType } from "../../types.js";
import { VariableObject, type VariableObjectProps } from "./variable.object.js";

export class MainObject {
  private readonly variables = new Set<VariableObject>();

  public variable<T extends DataType>(options: VariableObjectProps<T>) {
    return addToSet(this.variables, new VariableObject(options));
  }
}
