import { useSnapshot } from "valtio";
import { CustomButton } from "./";
import state from "../store";

const DualLogoPicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);

  const handleFrontLogoFile = (type) => {
    readFile(type, "front");
  };

  const handleBackLogoFile = (type) => {
    readFile(type, "back");
  };

  return (
    <div className="file-picker-container">
      <div className="flex flex-col gap-4 p-3">
        <h3 className="font-semibold text-white">Upload Logos</h3>

        {/* Front Logo Upload */}
        <div className="border border-gray-600 rounded-lg p-3">
          <h4 className="text-white text-sm mb-2">Front Logo</h4>
          <div className="flex-1 flex flex-col">
            <input
              id="front-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="front-file" className="file-picker-label">
              Upload Front Logo
            </label>

            <p className="mt-2 text-white text-xs truncate">
              {file?.name ? `Selected: ${file.name}` : "No front logo selected"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <CustomButton
                type="outline"
                title="Front Logo"
                handleClick={() => handleFrontLogoFile("logo")}
                customStyles="text-xs"
              />
              <CustomButton
                type="outline"
                title="Front Full"
                handleClick={() => handleFrontLogoFile("full")}
                customStyles="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Back Logo Upload */}
        <div className="border border-gray-600 rounded-lg p-3">
          <h4 className="text-white text-sm mb-2">Back Logo</h4>
          <div className="flex-1 flex flex-col">
            <input
              id="back-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="back-file" className="file-picker-label">
              Upload Back Logo
            </label>

            <p className="mt-2 text-white text-xs truncate">
              {file?.name ? `Selected: ${file.name}` : "No back logo selected"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <CustomButton
                type="outline"
                title="Back Logo"
                handleClick={() => handleBackLogoFile("logo")}
                customStyles="text-xs"
              />
              <CustomButton
                type="outline"
                title="Back Full"
                handleClick={() => handleBackLogoFile("full")}
                customStyles="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Current Logos Display */}
        <div className="border border-gray-600 rounded-lg p-3">
          <h4 className="text-white text-sm mb-2">Current Logos</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-xs text-gray-300">Front:</p>
              <img
                src={snap.frontLogoDecal}
                alt="Front logo"
                className="w-12 h-12 object-cover rounded border"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-300">Back:</p>
              <img
                src={snap.backLogoDecal}
                alt="Back logo"
                className="w-12 h-12 object-cover rounded border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualLogoPicker;
