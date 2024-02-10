import { skillSet } from "@/../public/data"
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

export function SkillAdd(props) {
  return (
    <MultiSelect
    options={skillSet}
    label="Users"
    text="Please select your user."
    virtualScroller
  />
  );
}
