import { useEffect, useRef } from "react";

const useDefer = (maxCount = 100) => {
  const frameCount = useRef(0);
  let rafId;

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const updateFrameCount = () => {
    raf = requestAnimationFrame(() => {
      frameCount.current += 1;
      if (frameCount.current >= maxCount) {
        return;
      }
      updateFrameCount();
    });
  };

  updateFrameCount();

  const defer = (n) => {
    // 當目前的 frame 大於給定的 n 時，則 render 他
    return frameCount.current >= n;
  };

  return defer;
};

export default useDefer;

// Usage
const defer = useDefer();
{defer(0) && <HeavyComponent/>} // 表示第一個 frame render
{defer(1) && <HeavyComponent/>} // 表示第二個 frame render
{defer(2) && <HeavyComponent/>} // 表示第三個 frame render
