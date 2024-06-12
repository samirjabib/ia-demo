"use client";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";

export const SearchFood: React.FC<{ name: string }> = (props) => {
  const { name } = props;

  const [search, setSearch] = useState(name);
  const [foods, setFoods] = useState<
    {
      name: string;
      calories: number;
      type: "fruit" | "meat" | "pastry" | "dairy" | "other";
      id: string;
    }[]
  >([]);

  const searchForFoodMutation = api.foods.searchFood.useMutation({
    onSuccess: (data) => {
      setFoods(data);
    },
  });

  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (search !== "") {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(() => {
        searchForFoodMutation.mutate({
          query: search,
        });
      }, 500);
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      setFoods([]);
    }
  }, [search, searchForFoodMutation]);

  return (
    <Card className="flex w-full flex-col gap-4 bg-neutral-900 p-8">
      <CardTitle>Search Food</CardTitle>

      <CardContent>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="steak"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 py-4">
          {foods.map((food) => (
            <div key={food.id}>
              <div className="flex w-full items-center justify-between py-2">
                <h2>
                  <span className="font-bold text-neutral-100">
                    {food.name}
                  </span>{" "}
                  - {food.calories} calories
                </h2>
                <FoodType type={food.type} />
              </div>
              <Separator />
            </div>
          ))}
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
        Meat
      </div>
    );
  }
  if (type === "pastry") {
    return (
      <div className="rounded-md border border-neutral-300 px-3 py-1 text-neutral-300">
        Pastry
      </div>
    );
  }
  if (type === "dairy") {
    return (
      <div className="rounded-md border border-yellow-300 px-3 py-1 text-yellow-300">
        Dairy
      </div>
    );
  }
  if (type === "other") {
    return (
      <div className="rounded-md border border-pink-300 px-3 py-1 text-pink-300">
        Other
      </div>
    );
  }
};
