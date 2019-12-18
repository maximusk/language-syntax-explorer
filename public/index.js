let state = {nodes: [], dictionary: []};

window.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
}

function setupEventListeners() {
    const analyzeBtn = document.querySelector('.analyze-btn');
    const exploreBtn = document.querySelector('.explore-btn');
    const pasteCodeBtn = document.querySelector('.paste-code-btn');

    analyzeBtn.addEventListener('click', submit);
    exploreBtn.addEventListener('click', explore);
    pasteCodeBtn.addEventListener('click', pasteCodeBlock);
}

function pasteCodeBlock() {
    const textarea = document.querySelector('.code-input');
    textarea.value = `
        function helloWorld() {
            const condition = true;
        
            if (condition) {
                console.log('hello world');
            }
        }
    `;
}

function explore() {
    const textarea = document.querySelector('.code-input');
    const selectionRange = [textarea.selectionStart, textarea.selectionEnd];
    const nodes = findMatchingNodes(selectionRange, state.nodes);
    const normalized = normalizeNodes(nodes, state.dictionary);
    renderNodes(normalized);
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

function submit() {
    const textarea = document.querySelector('.code-input');
    const code = textarea.value;

    fetch('/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code})
        }
    )
        .then(response => response.json())
        .then((data) => {
            state.nodes = data.nodes;
            state.dictionary = data.dictionary;
            const normalized = normalizeNodes(state.nodes, state.dictionary);
            renderNodes(normalized);
        })
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

function normalizeNodes(nodes, dictionary) {
    return nodes.reduce((acc, node) => {
        const index = dictionary.findIndex((element) => element.astNodeType === node.type);
        if (index !== -1) {
            acc.push({...dictionary[index], range: node.range});
        }
        return acc;
    }, []);
}

function renderNodes(nodes) {
    const container = document.querySelector('.nodes-container');

    // needs to be cleaned or added in another place
    container.addEventListener('mouseover', (event) => {
        // console.log('hovered over node with location: ' + JSON.stringify(nodes[i].range));
        if (event.target.classList.contains('list-item')) {
            const node = event.target;

            // resolve range from the node and select corresponding part in input
            console.log('hovered over node with location: ');
        }
    });

    const template = document.querySelector('#ast-node');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < nodes.length; i++) {
        const li = document.createElement('li');
        const nodeElement = document.importNode(template.content, true);
        nodeElement.querySelector('.node-type').textContent = nodes[i].type;
        // nodeElement.dataset.range = nodes[i].range;

        const linkElement = nodeElement.querySelector('.doc-link');
        linkElement.href = nodes[i].docUrl;

        li.appendChild(nodeElement);
        container.appendChild(li);
    }
}
