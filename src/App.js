import React, { useState } from "react";
import { Grommet, Box, TextInput, FormField } from "grommet";
import Slider from "./components/Slider";
import { Accessibility } from "grommet-icons";

function App() {
  const [title, setTitle] = useState("Titulo");
  const [stepWidth, setStepWidth] = useState(200);
  return (
    <Grommet>
      <Box
        justify="center"
        align="center"
        margin={{ top: "40px" }}
        width="medium"
        direction="row-responsive"
      >
        <FormField label="Titulo">
          <TextInput
            placeholder="Tutulo"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormField>

        <FormField label="Step Width">
          <TextInput
            placeholder="stepWidth"
            name="stepWidth"
            value={stepWidth}
            onChange={(event) => setStepWidth(event.target.value)}
          />
        </FormField>
      </Box>
      <Box justify="center" align="center" margin={{ top: "40px" }}>
        <Slider
          stepWidth={stepWidth}
          title={title}
          // next={<Accessibility />}
          // previous={<Accessibility />}
        />
      </Box>
    </Grommet>
  );
}

export default App;
