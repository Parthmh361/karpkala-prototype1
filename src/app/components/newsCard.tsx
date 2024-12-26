// components/NewsCard.tsx
import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface NewsCardProps {
  title: string;
  link: string;
  source: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, link, source }) => {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-shadow">
      <CardBody>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{source}</p>
      </CardBody>
      <CardFooter>
        <Button
          as="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="ghost"
          endContent={<FaExternalLinkAlt />}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
