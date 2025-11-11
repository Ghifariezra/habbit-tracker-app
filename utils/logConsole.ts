type LogType = "log" | "info" | "warn" | "error" | "success" | "debug";

export const prettyLog = (title: string, data?: any, type: LogType = "log") => {
    const icons: Record<LogType, string> = {
        log: "🧩",
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        success: "✅",
        debug: "🐞",
    };

    const colors: Record<LogType, string> = {
        log: "\x1b[37m",     // white
        info: "\x1b[36m",    // cyan
        warn: "\x1b[33m",    // yellow
        error: "\x1b[31m",   // red
        success: "\x1b[32m", // green
        debug: "\x1b[35m",   // magenta
    };

    const resetColor = "\x1b[0m";
    const icon = icons[type] || "🧩";
    const color = colors[type] || "\x1b[37m";

    let formattedData = "";
    if (data !== undefined) {
        try {
            formattedData = JSON.stringify(data, null, 2);
        } catch {
            formattedData = String(data);
        }
    }

    const output = `\n${color}${icon} ${title}:${resetColor}\n${formattedData ? formattedData + "\n" : ""
        }`;

    // Gunakan console sesuai type
    switch (type) {
        case "error":
            console.error(output);
            break;
        case "warn":
            console.warn(output);
            break;
        default:
            console.log(output);
    }
};
