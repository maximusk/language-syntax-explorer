export default function init() {
    setupEventListeners();
}

function setupEventListeners() {
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', explore);
}

function explore() {
    const textarea = document.querySelector('.code-input');
    const selectionRange = [textarea.selectionStart, textarea.selectionEnd];
    const nodes = findMatchingNodes(selectionRange, state.nodes);
    const normalized = normalizeNodes(nodes, state.dictionary);
    renderNodes(normalized);
}

function findMatchingNodes(selectionRange, astNodes) {
    return astNodes.reduce((acc, node) => {
        const matchingRange = intersection(selectionRange, node.range);
        if (matchingRange.length > 0) {
            acc.push(node);
        }
        return acc;
    }, []);
}

function intersection(r1, r2) {
    const result = [];
    if (r1[0] > r2[1] || r2[0] > r1[1]) {
        return [];
    } else {
        result[0] = Math.max(r1[0], r2[0]);
        result[1] = Math.max(r1[1], r2[1]);
    }
    return result;
}
