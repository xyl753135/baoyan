async function requestPermission() {
    Notification.requestPermission().then(permission => {
        // 'granted', 'denied', 'default'
        if(permission === 'default') {
            permission = 'denied';
        }
        console.log(`User ${permission} permissions for Local Notifications`);
    })
}

export async function createNotification(
    title: string, 
    description: string, 
    force: boolean, 
    id?: string) {

    // Get user permission
    if(force) {
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