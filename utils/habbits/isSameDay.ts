import type { Frequencys } from "@/types/habbits";

export const dateFormatter = (date: Date) => {
    const lastTime = date.toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Jakarta",
    })
    const lastDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
    });

    const timeFormat = lastTime.split(".")[0] + ":" + lastTime.split(".")[1];

    return {
        lastDate,
        lastTime: timeFormat,
    }
}

const toWIB = (d: Date) => {
    const wib = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    wib.setHours(0, 0, 0, 0);
    return wib;
};

const getWeekly = (today: Date, lastCompleted: Date) => {
    const getWeekNumber = (d: Date) => {
        const firstJan = new Date(d.getFullYear(), 0, 1);
        const days = Math.floor((+d - +firstJan) / (1000 * 60 * 60 * 24));
        return Math.ceil((days + firstJan.getDay() + 1) / 7);
    };

    return (
        getWeekNumber(today) === getWeekNumber(lastCompleted) &&
        today.getFullYear() === lastCompleted.getFullYear()
    );
};

const getDaily = (today: Date, lastCompleted: Date) => {
    console.log(today.getDate(), lastCompleted.getDate())
    return (
        today.getDate() <= lastCompleted.getDate() &&
        today.getMonth() === lastCompleted.getMonth() &&
        today.getFullYear() === lastCompleted.getFullYear()
    );
};

const getMonthly = (today: Date, lastCompleted: Date) => {
    const nextAvailable = new Date(
        lastCompleted.getFullYear(),
        lastCompleted.getMonth() + 1,
        lastCompleted.getDate()
    );

    return today < nextAvailable;
};

export function isSameDay(dateLastCompleted: string, dateToday: string, type: Frequencys) {
    const lastCompleted = toWIB(new Date(dateLastCompleted));
    const today = toWIB(new Date(dateToday));

    switch (type) {
        case "daily":
            return getDaily(today, lastCompleted);
        case "weekly":
            return getWeekly(today, lastCompleted);
        case "monthly":
            return getMonthly(today, lastCompleted);
        default:
            return false;
    }
}
