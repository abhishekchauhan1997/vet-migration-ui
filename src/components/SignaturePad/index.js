import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ id, canvasRef, onStrokeEnd }) => {
    return (
        <SignatureCanvas
            id={id}
            ref={canvasRef}
            penColor="#3b4468"
            // maxWidth={3}
            onEnd={onStrokeEnd}
            canvasProps={{
                className: "signature_pad",
            }}
            clearOnResize={false}
        />
    );
};

export default SignaturePad;
