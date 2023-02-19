import { NodeProps, Handle, Position } from "reactflow"

const Square = (props: NodeProps) => {
  return (
    <div className="bg-violet-500 rounded w-[200px] h-[200px] ">
        <Handle id="left" type="source" position={Position.Left} />
        <Handle id="right" type="source" position={Position.Right} />
    </div>
  )
}

export default Square