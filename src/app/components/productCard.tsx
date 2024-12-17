import React from "react";
import { Card, Button, Avatar } from "@nextui-org/react";

interface ProductCardProp {
  grids :number
}

const Product: React.FC<ProductCardProp> = ({grids}) => {
  return (
    <div>
      {/* Product Cards (Scrollable) */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${grids} gap-6 mt-8`}>
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="w-full md:min-w-[300px] p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out gap-5"
          >
            <div className="flex flex-row gap-3">
              <div className="w-24 h-24 bg-[#eef0f4] rounded-lg flex items-center justify-center mb-4">
                <Avatar size="lg" />
              </div>
              <div className="flex-1">
                <div className="text-[#545f70] font-semibold text-lg">
                  Design Leadership: How Top Design Leaders Build...
                </div>
                <div className="text-[#545f70] font-semibold mt-2 text-xl">
                  $38.95
                </div>
              </div>
            </div>
            <Button
              color="primary"
              className="w-full mt-4 py-2 bg-[#318CE7] text-white border-0 hover:bg-[#4A92D3] rounded-md"
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product