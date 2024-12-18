import React from "react";
import { Card, Button } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";

const NewsCard = () => {
  return (
    <div>
      {/* News Cards (Scrollable) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(8)].map((_, index) => (
          <Card
            key={index}
            className="flex-col w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out gap-5"
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-[#eef0f4] rounded-lg flex items-center justify-center mb-2">
                <picture color="success" />
              </div>
              <div className="flex-1">
                <div className="text-[#545f70] font-semibold text-md">
                  Design Leadership: How Top Design Leaders Build...
                </div>
                <div className="text-[#545f70b6] font-semibold mt-2 text-xl">
                  Source name
                </div>
              </div>
            </div>
            <Button
              color="primary"
              className="w-full py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md flex gap-3"
            >
              Read More <FaRegEye/>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
