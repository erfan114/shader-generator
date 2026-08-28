import { addToSet } from "../../helpers/set.helper.js";
import {
  type VariableDataType,
  VariableObject,
  type VariableObjectProps,
} from "./variable.object.js";

export class MainObject {
  private readonly variables = new Set<VariableObject>();

  public variable<T extends VariableDataType>(options: VariableObjectProps<T>) {
    return addToSet(this.variables, new VariableObject(options));
  }
}
