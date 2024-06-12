"use client";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useState } from "react";

export const SearchFood = ({ name }: { name: string }) => {
  const [search, setSearch] = useState(name);

  return (
    <Card className="flex w-full flex-col gap-4 bg-neutral-900 p-8">
      <CardTitle>Search Food</CardTitle>

      <CardContent>
        <div>
          <Label>{name}</Label>
          <Input
            type="text"
            placeholder="steak"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div>
            <div className="flex w-full items-center justify-between py-2">
              <h2>
                <span className="font-bold text-neutral-100">Steak</span> - 900
                calories
              </h2>
              <FoodType type="meat" />
            </div>
            <Separator />
          </div>
          <div>
            <div className="flex w-full items-center justify-between py-2">
              <h2>
                <span className="font-bold text-neutral-100">Strawberries</span>{" "}
                - 100 calories
              </h2>
              <FoodType type="meat" />
            </div>
            <Separator />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FoodType: React.FC<{
  type: "fruit" | "meat" | "pastry" | "dairy" | "other";
}> = (props) => {
  const { type } = props;

  if (type === "fruit") {
    return (
      <div className="rounded-md border border-red-300 px-3 py-1 text-red-300">
        Fruit
      </div>
    );
  }

  if (type === "meat") {
    return (
      <div className="rounded-md border border-purple-300 px-3 py-1 text-purple-300">
        Fruit
      </div>
    );
  }
  if (type === "pastry") {
    return (
      <div className="rounded-md border border-neutral-300 px-3 py-1 text-neutral-300">
        Fruit
      </div>
    );
  }
  if (type === "dairy") {
    return (
      <div className="rounded-md border border-yellow-300 px-3 py-1 text-yellow-300">
        Fruit
      </div>
    );
  }
  if (type === "other") {
    return (
      <div className="rounded-md border border-pink-300 px-3 py-1 text-pink-300">
        Fruit
      </div>
    );
  }
};
