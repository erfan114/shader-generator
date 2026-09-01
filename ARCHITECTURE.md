# Library architecture

## Overview

The main idea for this library is very simple: `Builder -> Compiler -> (Runtime | GLSL)`

We use colors to separate each step:

| Index | Name       | Color    |
| ----- | ---------- | -------- |
| `0`   | `Builder`  | `ORANGE` |
| `1`   | `Compiler` | `PURPLE` |
| `2`   | `Runtime`  | `BLUE`   |

Therefore, based on these colors we'd have something like this:

```mermaid
%%{init: {"themeCSS": "* { font-family: monospace; }"}}%%

flowchart LR;
  subgraph Overview
    direction LR

    Builder:::orange
    Compiler:::purple
    Runtime:::blue

    Builder-->Compiler
    Compiler-->Runtime
    Compiler-->GLSL
  end

  classDef orange fill:#f43f20,stroke:#b82d18,stroke-width:2px,color:#fff;
  classDef purple fill:#874FFF,stroke:#5427B4,stroke-width:2px,color:#fff;
  classDef blue fill:#3DADFF,stroke:#007AD2,stroke-width:2px,color:#fff;

  style Overview fill:#ffffff,stroke:#afafaf,stroke-width:2px;
```

## Builder architecture

In our `Builder` we have a lot of types and systems that are working compatible together

```mermaid
%%{init: {"themeCSS": "* { font-family: monospace; }"}}%%

flowchart LR
    subgraph Builder
        direction LR

        Construction
        GlobalScope["Global scope"]

        Defines
        Uniforms
        Inputs
        Outputs
        Functions

        LocalScope["Local scope"]
        Variables
        Arguments
        Values

        Addition
        Subtraction
        Multiplication
        Division

        Construction --> GlobalScope

        GlobalScope -->|Owns| Defines
        GlobalScope -->|Owns| Uniforms
        GlobalScope -->|Owns| Inputs
        GlobalScope -->|Owns| Outputs
        GlobalScope -->|Owns| Functions

        Functions -->|Owns| LocalScope
        LocalScope -->|Owns| Variables
        LocalScope -->|Owns| Arguments

        Variables -->|Owns| Values

        Values -->|Operation| Addition
        Values -->|Operation| Subtraction
        Values -->|Operation| Multiplication
        Values -->|Operation| Division
    end

    %% Styling
    classDef orange fill:#f43f20,stroke:#b82d18,stroke-width:2px,color:#fff;

    class Construction,GlobalScope,Defines,Uniforms,Inputs,Outputs,Functions,LocalScope,Variables,Arguments,Values,Addition,Subtraction,Multiplication,Division orange;

    style Builder fill:#ffe1df,stroke:#f43f20,stroke-width:2px;
```

We will use typescript native generators to implement this feature because it would be much more easier for developers to use generator syntax rather than defining OOP objects and relating them together
