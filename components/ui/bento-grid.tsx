import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bentoGridVariants = cva("grid gap-4 grid-cols-1 md:grid-cols-2 auto-rows-auto xl:auto-rows-fr", {
  variants: {
    columns: {
      2: "xl:grid-cols-2",
      3: "xl:grid-cols-3",
      4: "xl:grid-cols-4",
    },
    rows: {
      2: "xl:grid-rows-2",
      3: "xl:grid-rows-3",
      4: "xl:grid-rows-4",
    },
  },
  defaultVariants: {
    columns: 3,
    rows: 4,
  },
})

interface BentoGridProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bentoGridVariants> {}

function BentoGrid({
  className,
  columns,
  rows,
  children,
  ...props
}: BentoGridProps) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(bentoGridVariants({ columns, rows }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

const bentoItemVariants = cva(
  "rounded-2xl p-6 flex relative overflow-hidden transition-all min-h-[120px]",
  {
    variants: {
      variant: {
        default: "bg-card border border-border",
        gradient: "bg-gradient-to-br from-primary/40 via-primary/30 to-primary/40",
        muted: "bg-muted border border-border",
      },
      size: {
        default: "",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface BentoItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bentoItemVariants> {
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2 | 3
}

function BentoItem({
  className,
  variant,
  size,
  colSpan = 1,
  rowSpan = 1,
  children,
  ...props
}: BentoItemProps) {
  const spanClasses = cn(
    colSpan === 2 && "md:col-span-2 xl:col-span-2",
    colSpan === 3 && "md:col-span-2 xl:col-span-3",
    rowSpan === 2 && "xl:row-span-2",
    rowSpan === 3 && "xl:row-span-3"
  )

  return (
    <div
      data-slot="bento-item"
      className={cn(bentoItemVariants({ variant, size }), spanClasses, className)}
      {...props}
    >
      {children}
    </div>
  )
}

function BentoItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-item-content"
      className={cn("relative z-10 flex flex-col", className)}
      {...props}
    />
  )
}

function BentoItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="bento-item-title"
      className={cn("text-2xl font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function BentoItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="bento-item-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function BentoItemBackground({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-item-background"
      className={cn("absolute inset-0", className)}
      {...props}
    />
  )
}

function BentoItemStat({
  value,
  label,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  value: string
  label: string
}) {
  return (
    <div
      data-slot="bento-item-stat"
      className={cn("text-center", className)}
      {...props}
    >
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

function BentoItemQuote({
  quote,
  author,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  quote: string
  author: string
}) {
  return (
    <div
      data-slot="bento-item-quote"
      className={cn("", className)}
      {...props}
    >
      <p className="text-muted-foreground text-sm leading-relaxed">"{quote}"</p>
      <p className="text-muted-foreground/60 text-xs mt-2">— {author}</p>
    </div>
  )
}

export {
  BentoGrid,
  BentoItem,
  BentoItemContent,
  BentoItemTitle,
  BentoItemDescription,
  BentoItemBackground,
  BentoItemStat,
  BentoItemQuote,
}
