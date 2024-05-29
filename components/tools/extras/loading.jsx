"use client";
import useAppStore from "@/store/zustand";
import "./loading.css";

const Loading = () => {
  const frmLoading = useAppStore((state) => state.frmLoading);

  return (
    <>
      {frmLoading && (
        <div className="loading btn-primary">
          <span>Cargando</span>
        </div>
      )}
    </>
  );
};

export default Loading;
