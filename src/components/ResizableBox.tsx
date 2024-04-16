import { ResizableBox as ReactResizableBox } from "react-resizable";
import { useLayoutEffect, useState } from "react";

type ResizableBoxProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  resizable?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export default function ResizableBox({
  children,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}: ResizableBoxProps) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const width = size[0] < 1000 ? size[0] * 0.75 : 750;

  return (
    <div>
      <div
        style={{
          display: "inline-block",
          width: "auto",
          background: "white",
          padding: ".5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
