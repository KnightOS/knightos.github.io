---
# vim: tw=82
title: KnightOS Executable Format
layout: base
---

# KnightOS Executable Format

All KnightOS programs meant to be loaded by the kernel must use the KnightOS
Executable Format (KEXC). This format is comparible to the ELF format used on
Linux, in that it contains more than just executable code. It is simpler than ELF,
however, in that it does not contain debugging info and does not require linking
to execute.

Simply put, it takes the following format:

| Address | Length  | Description                            |
|:--------|:--------|:---------------------------------------|
| 0x0000  | 4       | The literal ASCII string "KEXC"        |
| 0x0004  | - - - - | A list of headers                      |
| - - - - | 1       | KEXC_HEADER_END, signals end of list   |
| - - - - | - - - - | Additional data to support the headers |
| - - - - | - - - - | Executable code, program data, etc     |

## Headers

The header list is a list of key-value pairs, where each key is 8 bits and each
value is 16 bits. It ends with KEXC_HEADER_END, which does not require a value.
Including a value with KEXC_HEADER_END has no negative side effects.

| Address | Length  | Description                            |
|:--------|:--------|:---------------------------------------|
| 0x0000  | 1       | Key                                    |
| 0x0001  | 2       | Value                                  |

When a pointer is used in the value, consider it relative to the start of the
file. If pointing to other header-related structures (for example, KEXC_NAME
points to a string), these structures should reside in the "additional data"
section (as defined above). This is not strictly required, but is a generally good
idea.

KEXC_ENTRY_POINT is the only required header.

The following headers are defined in `kernel.inc`:

| Name                  | Description                                            |
|:----------------------|:-------------------------------------------------------|
| KEXC_HEADER_END       | The end of the header list. Value may be omitted.      |
| KEXC_ENTRY_POINT      | Pointer to executable entry point.                     |
| KEXC_STACK_SIZE       | Bytes of stack required, divided by two.               |
| KEXC_KERNEL_VER       | Minimum kernel version supported. Major, minor.        |
| KEXC_THREAD_FLAGS     | Thread flags. Only the upper 8 bits are considered.    |
| KEXC_NAME             | Pointer to program name.                               |
| KEXC_DESCRIPTION      | Pointer to program description.                        |
