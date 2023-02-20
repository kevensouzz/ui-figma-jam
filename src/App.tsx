import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { zinc } from "tailwindcss/colors";
import DefaultEdge from "./components/edges/DefaultEdge";
import Square from "./components/nodes/Square";
import * as Toolbar from "@radix-ui/react-toolbar";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 600,
      y: 200,
    },
    data: {},
  },
] satisfies Node[];

const App = () => {
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((conneection: Connection) => {
    return setEdges((edges) => addEdge(conneection, edges));
  }, []);

  const addSquareNode = () => {
    setNodes(nodes => [
      ...nodes, 
        {
          id: crypto.randomUUID(),
          type: "square",
          position: {
            x: 1000,
            y: 250,
          },
          data: {},
        },
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "default",
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/3 -trasnlate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          onClick={addSquareNode}
          className="w-32 h-32 mt-6 bg-violet-500 rounded transition-transform hover:-translate-y-4"
        />
      </Toolbar.Root>
    </div>
  );
}

export default App;
