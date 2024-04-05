export async function requestPermission() {
    Notification.requestPermission().then(permission => {
        // permissions can be: 'granted', 'denied', 'default'
        // If user presses the 'x' to close the prompt, assume it means they said no.
        if(permission === 'default') {
            console.log(`User closed the permissions prompt for Local Notifications`);
        } else {
            console.log(`User ${permission} permissions for Local Notifications`);
        }
        
    })
}

export async function createNotification(
    title: string, 
    description: string, 
    force: boolean, 
    id?: string) {

    // Get user permission
    if(force) {
        // This doesn't seem to reprompt user after a denial, with Chrome
        if (Notification.permission === 'default' || Notification.permission === 'denied') {
            await requestPermission();
        }
    } else {
        if (Notification.permission === 'default') {
            await requestPermission();
        }
    }

    if (Notification.permission === 'granted') {
        const options = {
            body: description,
            tag: id
        }

        const notif = new Notification(
            title,
            options,
        )
        notif.onerror = (event) => {
            console.error(`Threw error during sending local notification:`, event);
        };
    } 
    
    
}

export function manualCloseNotification(notif: Notification) {
    if (notif) {
        notif.close();
    }
}