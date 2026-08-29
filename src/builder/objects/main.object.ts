import { addToSet } from "../../helpers/set.helper.js";
import {
  type Variable,
  type VariableDataType,
  type VariableObjectProps,
  variable,
} from "./variable.object.js";

export class MainObject {
  private readonly variables = new Set<Variable>();

  public variable<T extends VariableDataType>(options: VariableObjectProps<T>) {
    return addToSet(this.variables, variable(options));
  }
}
