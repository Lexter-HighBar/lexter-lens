export function formatCreatedOnDate(createdOn: Date): string {
    createdOn.setDate(createdOn.getDate() - 1);
    return createdOn.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}