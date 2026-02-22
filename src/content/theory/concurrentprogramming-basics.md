---
title: "Basics Concepts of Concurrent Programming: Processes"
description: "How does concurrent programming works and what processes are involved?"
date: 2026-02-22
tags: ["concurrent-programming", "processes", "concurrent", "concurrent-systems", "modelling"]
---

# Sequential Processes

A **sequential process** is a method of executing tasks in a strict, step-by-step, linear order, where each stage must finish before the next begins. The output of one step becomes the input for the next, ensuring predictable, consistent results. 
Its semantics can be analysed considering the **memory state at each instant**:
$$\mathcal{S}\llbracket P \rrbracket : State \rightarrow State$$
where State is a list of variables belonging to $\mathbb{Z}$ : $State = [Var \rightarrow \mathbb{Z} ]$ .

For example, the program P below is a sequential process: <br>
$$
\begin{aligned}
P: & \\\\
& x \leftarrow 1 \\\\
& y \leftarrow 0 \\\\
& \textbf{while } x < 10 \textbf{ do} \\\\
& \quad y \leftarrow y + x \\\\
& \quad x \leftarrow x + 1 \\\\
& \textbf{print } y
\end{aligned}
$$
	 

Why? Because in sequential programs/processes, **instructions are executed one after another**, and in P, that happens. There aren't any instructions being executed simultaneously, and the program doesn't wait for new data.
A classical sequential process is seen as a calculus: it receives data, processes it, and finishes. 

## Equivalency of sequential processes
Two processes are **equivalent** if **they execute the same function**, even if written in different ways.

For example, P and Q are equivalent sequential processes:
$$
\begin{aligned}
P: & \\\\
& x \leftarrow 1 \\\\
\end{aligned}$$
$$
\begin{aligned}
Q: & \\\\
& x \leftarrow 0 \\\\
& x \leftarrow x + 1 \\\\
\end{aligned}
$$

<p>The final x value is 1 in both programs.</p>
<p>As P and Q are equivalent, so is their composition P; Q, the complementary composition Q; P, and a transitive composition for a program R: R; P and R; Q, among others.</p>

# Concurrent/Reactive Processes
A **concurrent process** is the **simultaneous execution of several interrelated computer programs**, or, in other words, a set of state machines that cooperate using communication. Each individual process inside the machine is a sequential process in execution. 
To represent concurrent processes, we use **||**: If we have concurrent processes P and Q and they execute simultaneously, **interleaving their instruction**s, we write P||Q. If we use the example above, we will have different final values for x:
- If we first execute P and then Q, x is 1.
- If we execute Q's first instruction, then P, and then Q's second instruction, x is 2.
This demonstrates that the semantics are **not deterministic**, because there are many possible results. Because of that, the equivalence is **not preserved** when we intercalate processes together. 

## Concurrency
Concurrency can be described as simultaneous logical work that doesn't force the multiprocessor. 
## Parallelism
Parallelism can be described as the simultaneous physical work that forces the multiprocessor or various processor units. 

# Process
A process is a sequential program in execution, described as a state machine, where a state can be the memory, the program counter, etc. A multiprocessor program behaves as a set of state machines that cooperate with intermediate communication. If each process has a processor, processes can execute simultaneously. If not, a scheduler can be used to assign processes to processors.

## Process Synchronisation
Process synchronisation is an interaction where **one or more processes depend on the behaviour of other processes**. It can be a **competition**, when more than one process needs a shared resource, or a **cooperation**, when the progress of a process depends on the progress of others, like a **rendezvous** (meeting in french), where processes only advance when every other one is at that meet point.

# Modelling Concurrent Systems
Concurrent systems must be modelled to ensure properties and their correctness, and to determine if the implementation is according to the specification.

Let's look at an example: A vending machine.
**Communication actions** are observable actions that connect the user with the machine. When using a vending machine, we observe someone pressing buttons, inserting coins, and the beverage/food falling. 
**Internal actions** are non-observable actions, things the machine does internally or the human using it, without any connection whatsoever. For example, the human needs to think about what he wants, check how much money he has, take it out of his pocket, and grab the food he bought. The machine has a mechanism to eject the food.

## Abstract Model of a Process
A process is described as a set of actions, called the **process's alphabet**. The **set of communication actions** is called **Com** (a,b,c,...), and the **set of internal actions** is called **Int** ([a], [b], [c],...). The **action set** **Act** is defined as the union of *Com* and *Int*: $Act = Com \cup Int$ . The execution of an action changes the process's state.