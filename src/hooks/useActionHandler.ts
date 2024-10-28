import { useRedirectToLogin } from "hooks/useRedirectToLogin";
import { showErrorNotification } from "components";

export const useActionHandler = () => {
    const redirectToLogin = useRedirectToLogin();

    const handleActionClick = async (action: (arg: string) => Promise<void>, arg: string) => {
        redirectToLogin();

        try {
            await action(arg);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred while performing this action.";
            showErrorNotification(errorMessage);
        }
    };

    return { handleActionClick };
};
