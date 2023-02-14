import { Grid } from "@rhinobase/docs/components";
import React from "react";
import { UploadField } from "./UploadField";

export default {
  title: "Forms/Upload Field",
  component: UploadField,
};

export function Default() {
  return (
    <Grid>
      <UploadField />
    </Grid>
  );
}
