import { memo, PropsWithChildren } from "react";
import { View } from "react-native";

interface SwipeCardProps extends PropsWithChildren {
    className?: string;
}

export const SwipeCard = memo(({ children, className }: SwipeCardProps) => {
    return (
        <View className={`flex-1 justify-center ${className} rounded-2xl px-8`}>
            {children}
        </View>
    );
});

SwipeCard.displayName = "SwipeCard";
