"use client"
import { useStore } from "@/store/useStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PenLine, Check, Languages, BookOpen } from "lucide-react"

const INPUTS = [
  { index: "meaning", name: "Meaning", japanese: "意味", icon: BookOpen },
  { index: "reading-on", name: "On'yomi", japanese: "音読み", icon: Languages },
  { index: "reading-kun", name: "Kun'yomi", japanese: "訓読み", icon: PenLine },
]

function ChooseInputs() {
  const inputs = useStore((state) => state.inputs)
  const addInput = useStore((state) => state.addInput)
  const removeInput = useStore((state) => state.removeInput)

  const handleClick = (index) => {
    if (inputs.includes(index)) {
      removeInput(index)
    } else {
      addInput(index)
    }
  }

  return (
    <Card className="w-full max-w-xs border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <PenLine className="h-5 w-5 text-primary" />
          <span>Choose Inputs</span>
          <span className="text-xs text-muted-foreground font-normal ml-auto">{inputs.length} selected</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          {INPUTS.map((input) => {
            const isSelected = inputs.includes(input.index)
            const Icon = input.icon
            return (
              <Button
                key={input.index}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-between h-12 transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:border-primary/50"
                }`}
                onClick={() => handleClick(input.index)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold">{input.name}</span>
                  <span className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {input.japanese}
                  </span>
                </div>
                {isSelected && <Check className="h-4 w-4" />}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ChooseInputs
