import React from "react";
import useFetch from "../../hooks/useFetch";

const Person = () => {
  const { data, loading } = useFetch(`/person/2524`);
  console.log(data);
  return <div></div>;
};

export default Person;
