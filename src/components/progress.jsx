import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

function ProgressBar({expectedTime, theme, load}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if(load) {
            setInterval(() => {
                setProgress((prev) => {
                    if(prev == 100) {
                        return 100;
                    } else if(prev < 90) {
                        return prev + (50/expectedTime);
                    } else {
                        return 90;
                    }
                })
            }, 1000);
        } else {
            setProgress(100);
        }
    }, [load]);

    return (theme == "light") ? (
        <Progress value={progress} className="w-[60%] h-3 [&>div]:bg-slate-50" style={{backgroundColor: "#64748b"}}/>
    ) : (
        <Progress value={progress} className="w-[60%] h-3 [&>div]:bg-zinc-950" style={{backgroundColor: "#d4d4d8"}}/>
    );
}

export default ProgressBar;

/**
 * total = 50
 * 50 * 1 = 50 steps
 * 50 seconds
 * 
 * 5 steps => 10 seconds
 * 10 => 5
 * 20 => 2.5
 * 
 */