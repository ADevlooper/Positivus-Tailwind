document.addEventListener('DOMContentLoaded', () => {
    // Optional: Add any initialization logic here
});

function toggleAccordion(index) {
    const content = document.getElementById(`content-${index}`);
    const card = document.getElementById(`card-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    // Toggle content visibility
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        
        // Change card background to green
        card.classList.remove('bg-gray-100');
        card.classList.add('bg-[#B9FF66]');
        
        // Change icon to minus
        icon.textContent = '-';
    } else {
        content.classList.add('hidden');
        
        // Revert card background to gray
        card.classList.remove('bg-[#B9FF66]');
        card.classList.add('bg-gray-100');
        
        // Change icon to plus
        icon.textContent = '+';
    }
}
