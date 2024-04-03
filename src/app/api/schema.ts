import { readFileSync } from "fs";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export default typeDefs;
