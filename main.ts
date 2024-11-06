import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello from the Trees!");
});

interface Tree {
  id: string;
  species: string;
  age: number;
  location: string;
}

const oak: Tree = {
  id: "3",
  species: "oak",
  age: 4,
  location: "Jim's Park",
};

const setItem = (key: string, value: Tree) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): Tree | null => {
  const tree = localStorage.getItem(key);
  if (!tree) return null;
  return JSON.parse(tree) as Tree;
};

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

/* test of set and get */
setItem(`trees_${oak.id}`, oak);
const newTree = getItem(`trees_${oak.id}`);
console.log({ newTree });

app.post("/trees", async (c) => {
  const tree = (await c.req.json()) as Tree;
  setItem(`trees_${tree.id}`, tree);
  return c.json({ message: `We just added a ${tree.species} tree.` });
});

app.get("/trees/:id", async (c) => {
  const id = await c.req.param("id");
  const tree = getItem(`trees_${id}`);
  if (!tree) return c.json({ message: "Tree not found" }, 404);
  return c.json(tree);
});

app.put("/trees/:id", async (c) => {
  const id = await c.req.param("id");
  if (!id) return c.json({ message: "Tree to update not found" }, 404);
  const tree = (await c.req.json()) as Tree;
  const treeOld = getItem(`trees_${id}`);
  const treeNew = { ...treeOld, ...tree, id };
  setItem(`trees_${id}`, treeNew);
  return c.json({ message: `We just updated a ${treeNew.species} tree.` });
});

app.delete("/trees/:id", async (c) => {
  const id = await c.req.param("id");
  if (!id) return c.json({ message: "Tree to delete not found" }, 404);
  deleteItem(`trees_${id}`);
  return c.json({ message: `We just deleted a tree with id = ${id}.` });
});

Deno.serve(app.fetch);
