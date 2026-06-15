"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  badgeVariants,
  codeBlockStyles,
  copyButtonStyles,
  tagChipStyles,
  tagChipActiveStyles,
} from "@/presentation/_styles/components.styles";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type CardProps = React.ComponentProps<"div"> & {
  variant?: "default" | "interactive" | "featured";
};

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline" | "framework" | "category";
};

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={cn(copyButtonStyles, className)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
}

function CodeBlock({
  code,
  language,
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  return (
    <div className={cn(codeBlockStyles.wrapper, className)}>
      <div className={codeBlockStyles.header}>
        {language && (
          <span className={codeBlockStyles.language}>{language}</span>
        )}
        <CopyButton text={code} />
      </div>
      <pre className={codeBlockStyles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

type TagChipProps = React.ComponentProps<"button"> & {
  active?: boolean;
};

function TagChip({ active, className, ...props }: TagChipProps) {
  return (
    <button
      className={cn(tagChipStyles, active && tagChipActiveStyles, className)}
      {...props}
    />
  );
}

export { Card, Badge, CopyButton, CodeBlock, TagChip };
