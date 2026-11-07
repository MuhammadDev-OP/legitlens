"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  CustomEase,
);

let easesReady = false;
function ensureEases() {
  if (easesReady) return;
  CustomEase.create("ll-out", "0.23,1,0.32,1");
  CustomEase.create("ll-inOut", "0.77,0,0.175,1");
  easesReady = true;
}

function motionPath(path: SVGPathElement, end = 1) {
  return { path, align: path, alignOrigin: [0.5, 0.5] as [number, number], start: 0, end };
}

/**
 * Hero scan plus the section motion from the approved concept.
 * prefers-reduced-motion keeps the finished scan and skips scroll motion.
 */
export function useHomeMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    ensureEases();
    const rootEl = root.current;
    if (!rootEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const btn = rootEl.querySelector<HTMLButtonElement>(".replay");
      const status = rootEl.querySelector<HTMLElement>("#scan-status");
      if (!btn || !status) return;
      const onClick = () => {
        status.textContent =
          "The example is already showing its finished verdict: Be careful. احتیاط کریں.";
      };
      btn.addEventListener("click", onClick);
      return () => btn.removeEventListener("click", onClick);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let disposed = false;
      let ctx: gsap.Context | null = null;
      let tick = 0;

      const boot = () => {
        if (disposed) return;
        ctx = gsap.context(() => {
          let dropReplay: (() => void) | undefined;
          let t = 9 * 60 + 59;
          const countdowns = gsap.utils.toArray<HTMLElement>(".js-countdown");
          const countdowns2 = gsap.utils.toArray<HTMLElement>(".js-countdown2");
          tick = window.setInterval(() => {
            t = t <= 0 ? 599 : t - 1;
            const m = String(Math.floor(t / 60)).padStart(2, "0");
            const s = String(t % 60).padStart(2, "0");
            countdowns.forEach((el) => {
              el.textContent = `00:${m}:${s}`;
            });
            countdowns2.forEach((el) => {
              el.textContent = `${m}:${s}`;
            });
          }, 1000);

          gsap.from(".know-line path", {
            drawSVG: "0%",
            duration: 1.2,
            ease: "ll-inOut",
            delay: 0.35,
          });

          const scan = gsap.utils.toArray<HTMLElement>(".scan")[0];
          const lens = scan?.querySelector<HTMLElement>(".lens");
          const sigs = scan ? Array.from(scan.querySelectorAll<HTMLElement>(".sig")) : [];
          const spots = ["url", "logo", "sale", "refund"].map((key) =>
            scan?.querySelector<HTMLElement>(`[data-spot="${key}"]`),
          );
          const verdictText = scan?.querySelector<HTMLElement>(".scan__verdict-text");
          const pill = verdictText?.querySelector<HTMLElement>(".pill");
          const needle = scan?.querySelector<HTMLElement>(".meter__needle");
          const replay = scan?.querySelector<HTMLButtonElement>(".replay");

          if (scan && lens && verdictText && needle && pill && sigs.length === 4) {
            sigs.forEach((sig) => {
              const value = sig.querySelector(".sig__v");
              sig.dataset.final = value?.textContent ?? "";
            });

            const pos = (el: HTMLElement) => {
              const s = scan.getBoundingClientRect();
              const r = el.getBoundingClientRect();
              const lw = lens.offsetWidth || 92;
              return {
                x: r.left - s.left + r.width / 2 - lw / 2,
                y: r.top - s.top + r.height / 2 - lw / 2,
              };
            };

            const reset = () => {
              sigs.forEach((sig) => {
                sig.classList.remove("is-found");
                sig.classList.add("is-pending");
                const value = sig.querySelector(".sig__v");
                if (value) value.textContent = "Checking…";
              });
              spots.forEach((spot) => spot?.classList.remove("is-hit"));
              gsap.set(verdictText, { autoAlpha: 0, y: 12 });
              gsap.set(needle, { rotation: -72, svgOrigin: "60 60" });
              const shop = scan.querySelector<HTMLElement>(".shop");
              const start = shop ? pos(shop) : { x: 40, y: 80 };
              gsap.set(lens, { x: start.x, y: start.y + 30, autoAlpha: 0, scale: 0.6 });
            };

            const found = (index: number) => {
              const sig = sigs[index];
              const spot = spots[index];
              if (!sig) return;
              sig.classList.remove("is-pending");
              sig.classList.add("is-found");
              const value = sig.querySelector(".sig__v");
              if (value) value.textContent = sig.dataset.final ?? "";
              spot?.classList.add("is-hit");
            };

            const tl = gsap.timeline({ paused: true });
            tl.to(lens, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
            spots.forEach((spot, i) => {
              if (!spot) return;
              const sig = sigs[i];
              tl.to(
                lens,
                {
                  x: () => pos(spot).x,
                  y: () => pos(spot).y,
                  duration: 0.85,
                  ease: "power3.inOut",
                },
                i === 0 ? "+=0.1" : "+=0.25",
              )
                .to(lens, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" })
                .call(() => found(i), undefined, "<0.1");
              if (sig) {
                tl.fromTo(
                  sig,
                  { scale: 0.94 },
                  { scale: 1, duration: 0.5, ease: "back.out(2.5)" },
                  "<",
                );
              }
              tl.to(needle, { rotation: -72 + (i + 1) * 20, duration: 0.6, ease: "ll-out" }, "<");
            });
            tl.to(lens, { autoAlpha: 0, scale: 0.7, duration: 0.45, ease: "power2.in" }, "+=0.35")
              .to(verdictText, { autoAlpha: 1, y: 0, duration: 0.7, ease: "ll-out" }, "<0.15")
              .fromTo(pill, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: "back.out(2.6)" }, "<")
              .fromTo(
                ".scan__verdict",
                { backgroundColor: "rgba(208,137,53,0.18)" },
                {
                  backgroundColor: "rgba(208,137,53,0)",
                  duration: 1.2,
                  ease: "ll-out",
                  clearProps: "backgroundColor",
                },
                "<",
              );

            const play = () => {
              reset();
              tl.invalidate().restart();
            };
            reset();
            gsap.delayedCall(0.6, play);
            const onReplay = () => play();
            replay?.addEventListener("click", onReplay);
            dropReplay = () => replay?.removeEventListener("click", onReplay);
          }

          const splits: SplitText[] = [];
          gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
            splits.push(
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                aria: "auto",
                onSplit: (self) => {
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.1,
                    ease: "ll-out",
                    stagger: 0.09,
                    scrollTrigger: { trigger: el, start: "top 88%", once: true },
                  });
                },
              }),
            );
          });

          const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          if (reveals.length) {
            gsap.set(reveals, { autoAlpha: 0, y: 28 });
            ScrollTrigger.batch(reveals, {
              start: "top 90%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "ll-out",
                  stagger: 0.08,
                  overwrite: true,
                }),
            });
          }

          const age = gsap.utils.toArray<HTMLElement>(".age")[0];
          if (age) {
            gsap
              .timeline({ scrollTrigger: { trigger: age, start: "top 85%", once: true } })
              .from(".age__bar--old", { scaleX: 0, duration: 1.4, ease: "ll-inOut" })
              .from(".age__bar--new", { scaleX: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(3)" }, "-=0.2")
              .from(".age__flag", { autoAlpha: 0, x: 10, duration: 0.6, ease: "ll-out" }, "<0.2");
          }

          const gl = gsap.utils.toArray<HTMLElement>(".g-l")[0];
          const g1 = gsap.utils.toArray<HTMLElement>(".g-1")[0];
          const gs = gsap.utils.toArray<HTMLElement>(".g-swap")[0];
          if (gl && g1 && gs) {
            gsap.set(gl, { visibility: "visible", yPercent: 0 });
            gsap.set(g1, { yPercent: 110 });
            const glyph = gsap
              .timeline({ repeat: -1, repeatDelay: 1.4, paused: true })
              .to({}, { duration: 1.1 })
              .to(gl, { yPercent: -110, duration: 0.55, ease: "ll-inOut" })
              .to(g1, { yPercent: 0, duration: 0.55, ease: "ll-inOut" }, "<")
              .fromTo(
                gs,
                { boxShadow: "0 0 0 1px rgba(208,137,53,.5), 0 0 0 0 rgba(208,137,53,.5)" },
                {
                  boxShadow: "0 0 0 1px rgba(208,137,53,.5), 0 0 0 10px rgba(208,137,53,0)",
                  duration: 0.8,
                  ease: "ll-out",
                },
                "<0.3",
              )
              .to({}, { duration: 2.2 })
              .to(g1, { yPercent: 110, duration: 0.55, ease: "ll-inOut" })
              .fromTo(
                gl,
                { yPercent: -110 },
                { yPercent: 0, duration: 0.55, ease: "ll-inOut", immediateRender: false },
                "<",
              );
            ScrollTrigger.create({
              trigger: ".card--glyph",
              start: "top 85%",
              end: "bottom top",
              onToggle: (self) => (self.isActive ? glyph.play() : glyph.pause()),
            });
          }

          gsap.utils.toArray<SVGSVGElement>(".wire").forEach((svg) => {
            const out = svg.querySelector<SVGPathElement>(".wire__out");
            const back = svg.querySelector<SVGPathElement>(".wire__back");
            const pOut = svg.querySelector<SVGGElement>(".packet--out");
            const pBack = svg.querySelector<SVGGElement>(".packet--back");
            if (!out || !back || !pOut || !pBack) return;
            gsap.set([pOut, pBack], { autoAlpha: 0 });
            const tlw = gsap.timeline({
              scrollTrigger: { trigger: ".flow", start: "top 70%", once: true },
            });
            tlw
              .from(out, { drawSVG: "0%", duration: 1.1, ease: "ll-inOut" })
              .from(back, { drawSVG: "0%", duration: 1.1, ease: "ll-inOut" }, "<0.35");
            const loop = gsap
              .timeline({ repeat: 2 })
              .set(pOut, { autoAlpha: 1 })
              .fromTo(
                pOut,
                { motionPath: motionPath(out, 0) },
                {
                  motionPath: motionPath(out),
                  duration: 1.6,
                  ease: "power1.inOut",
                  immediateRender: false,
                },
              )
              .set(pOut, { autoAlpha: 0 })
              .to(
                ".flow__server",
                {
                  boxShadow:
                    "0 0 0 1px rgba(201,162,39,.5), 0 0 60px -10px rgba(201,162,39,.45)",
                  duration: 0.25,
                  yoyo: true,
                  repeat: 1,
                },
              )
              .set(pBack, { autoAlpha: 1 })
              .fromTo(
                pBack,
                { motionPath: motionPath(back, 0) },
                {
                  motionPath: motionPath(back),
                  duration: 1.6,
                  ease: "power1.inOut",
                  immediateRender: false,
                },
              )
              .set(pBack, { autoAlpha: 0 })
              .to({}, { duration: 0.4 });
            tlw.eventCallback("onComplete", () => {
              gsap.set([pOut, pBack], { autoAlpha: 1 });
            });
            tlw
              .add(loop, "-=0.2")
              .set([pOut, pBack], { autoAlpha: 1 })
              .fromTo(
                pOut,
                { motionPath: motionPath(out, 0) },
                { motionPath: motionPath(out, 0.38), duration: 0.9, ease: "ll-out", immediateRender: false },
              )
              .fromTo(
                pBack,
                { motionPath: motionPath(back, 0) },
                {
                  motionPath: motionPath(back, 0.68),
                  duration: 0.9,
                  ease: "ll-out",
                  immediateRender: false,
                },
                "<0.2",
              );
          });

          const browser = gsap.utils.toArray<HTMLElement>(".browser")[0];
          if (browser) {
            gsap
              .timeline({ scrollTrigger: { trigger: browser, start: "top 75%", once: true } })
              .from(".browser .banner", { yPercent: -100, autoAlpha: 0, duration: 0.7, ease: "ll-out" }, 0.3)
              .from(
                ".popup",
                { y: -14, scale: 0.96, autoAlpha: 0, duration: 0.7, ease: "ll-out", transformOrigin: "top right" },
                0.6,
              )
              .from(".wa", { y: 24, autoAlpha: 0, duration: 0.7, ease: "ll-out" }, 1.0);
          }

          ScrollTrigger.refresh();
          return () => {
            splits.forEach((split) => split.revert());
            dropReplay?.();
          };
        }, rootEl);
      };

      if (document.fonts?.status === "loaded") boot();
      else void document.fonts.ready.then(boot);

      return () => {
        disposed = true;
        window.clearInterval(tick);
        ctx?.revert();
      };
    });

    return () => mm.revert();
  }, { scope: root });
}
